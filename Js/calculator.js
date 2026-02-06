// Simple calculator for Tokyo Cars
document.addEventListener('DOMContentLoaded', function() {
    // Get display element
    const display = document.getElementById('display');
    
    // Get all calculator buttons
    const calculatorBtns = document.querySelectorAll('.calculator-btn');
    
    // Calculator variables
    let currentValue = '';
    let previousValue = '';
    let operator = '';
    
    // Initialize calculator display
    display.value = '0';
    
    // Add click event to all calculator buttons
    calculatorBtns.forEach(button => {
        button.addEventListener('click', function() {
            const btnText = this.textContent;
            
            // Handle clear button
            if (btnText === 'C') {
                clearCalculator();
                return;
            }
            
            // Handle delete button
            if (btnText === '⌫') {
                deleteLast();
                return;
            }
            
            // Handle equals button
            if (btnText === '=') {
                calculateResult();
                return;
            }
            
            // Handle operators
            if (['÷', '×', '-', '+'].includes(btnText)) {
                handleOperator(btnText);
                return;
            }
            
            // Handle numbers and decimal point
            handleNumber(btnText);
        });
    });
    
    // Function to handle number input
    function handleNumber(number) {
        // Prevent multiple decimal points
        if (number === '.' && currentValue.includes('.')) {
            return;
        }
        
        // If we just calculated a result, start fresh
        if (display.value === '0' || operator === '=') {
            currentValue = number;
            operator = '';
        } else {
            currentValue += number;
        }
        
        // Update display
        display.value = currentValue;
    }
    
    // Function to handle operators
    function handleOperator(op) {
        // If we have both values, calculate first
        if (previousValue && currentValue && operator) {
            calculateResult();
        }
        
        // Set operator
        operator = op;
        previousValue = currentValue;
        currentValue = '';
        
        // Show operation in display
        display.value += ' ' + op + ' ';
    }
    
    // Function to calculate result
    function calculateResult() {
        // Don't calculate if we don't have both values
        if (!previousValue || !currentValue || !operator) {
            return;
        }
        
        let result;
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        
        // Perform calculation based on operator
        switch(operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                // Handle division by zero
                if (current === 0) {
                    display.value = 'Error';
                    clearCalculator();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        // Round result to avoid floating point issues
        result = Math.round(result * 100000000) / 100000000;
        
        // Update display with result
        display.value = result.toString();
        
        // Reset calculator state
        previousValue = result.toString();
        currentValue = '';
        operator = '=';
    }
    
    // Function to clear calculator
    function clearCalculator() {
        currentValue = '';
        previousValue = '';
        operator = '';
        display.value = '0';
    }
    
    // Function to delete last character
    function deleteLast() {
        if (currentValue.length > 0) {
            currentValue = currentValue.slice(0, -1);
            display.value = currentValue || '0';
        }
    }
    
    // Add keyboard support (simple version)
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        // Handle numbers 0-9
        if (key >= '0' && key <= '9') {
            handleNumber(key);
            return;
        }
        
        // Handle decimal point
        if (key === '.') {
            handleNumber(key);
            return;
        }
        
        // Handle operators
        if (key === '+') {
            handleOperator('+');
            return;
        }
        
        if (key === '-') {
            handleOperator('-');
            return;
        }
        
        if (key === '*') {
            handleOperator('×');
            return;
        }
        
        if (key === '/') {
            event.preventDefault(); // Prevent default to avoid quick find
            handleOperator('÷');
            return;
        }
        
        // Handle equals/enter
        if (key === 'Enter' || key === '=') {
            event.preventDefault();
            calculateResult();
            return;
        }
        
        // Handle clear (Escape or Delete)
        if (key === 'Escape' || key === 'Delete') {
            clearCalculator();
            return;
        }
        
        // Handle backspace
        if (key === 'Backspace') {
            event.preventDefault();
            deleteLast();
            return;
        }
    });
});