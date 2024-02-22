document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
    const domainInput = document.getElementById('domainInput');
    const resultContainer = document.getElementById('resultContainer');
  
    submitButton.addEventListener('click', function() {
      const domain = domainInput.value;
  
      // Tworzymy obiekt zawierający dane do wysłania
      const data = {
        domain: domain
      };
  
      // Wykonujemy żądanie POST
      fetch('http://localhost/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.text())
      .then(data => {
        // Zamieniamy znaki \r\n na <br> w odpowiedzi
        const formattedData = data.replace(/\\r\\n/g, '<br>');
        // Wyświetlamy wynik żądania POST
        resultContainer.innerHTML = formattedData;
      })
      .catch(error => {
        console.error('Wystąpił błąd:', error);
        resultContainer.textContent = 'Wystąpił błąd podczas wysyłania żądania.';
      });
    });
});
