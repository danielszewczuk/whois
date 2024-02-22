document.addEventListener('DOMContentLoaded', function() {
        const submitButton = document.getElementById('submitButton');
        const domainInput = document.getElementById('domainInput');
        const resultContainer = document.getElementById('resultContainer');
    
        submitButton.addEventListener('click', function() {
            const domain = domainInput.value;
    
            const data = {
                domain: domain
            };

            // Zamiast wysyłać żądanie do zewnętrznego serwera, wysyłamy je bezpośrednio do serwera
            fetch('/api/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.text())
            .then(data => {
                const formattedData = data.replace(/\\r\\n/g, '<br>');
                resultContainer.innerHTML = formattedData;
            })
            .catch(error => {
                console.error('Wystąpił błąd:', error);
                resultContainer.textContent = 'Wystąpił błąd podczas wysyłania żądania.';
            });
        });
});
  

      fetch('https://whoislookup.vercel.app/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.text())
      .then(data => {
        const formattedData = data.replace(/\\r\\n/g, '<br>');
        resultContainer.innerHTML = formattedData;
      })
      .catch(error => {
        console.error('Wystąpił błąd:', error);
        resultContainer.textContent = 'Wystąpił błąd podczas wysyłania żądania.';
      });

