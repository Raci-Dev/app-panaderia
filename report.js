document.addEventListener('DOMContentLoaded', () => {
    const sales = JSON.parse(localStorage.getItem('sales')) || [];
    console.log("Ventas almacenadas:", sales);  // Verificar que las ventas están correctamente almacenadas

    document.getElementById('generate-report').addEventListener('click', () => {
        try {
            generateReport(sales);
        } catch (error) {
            console.error('Error generando el reporte:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al generar el reporte. Por favor, inténtalo de nuevo.',
            });
        }
    });

    function generateReport(sales) {
        const startDateInput = document.getElementById('start-date').value;
        const endDateInput = document.getElementById('end-date').value;

        if (!startDateInput || !endDateInput) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor selecciona un rango de fechas válido.',
            });
            return;
        }

        const startDate = new Date(startDateInput);
        const endDate = new Date(endDateInput);
        endDate.setHours(23, 59, 59, 999);  // Incluir todo el día

        console.log("Fecha de inicio:", startDate);  // Verificar fechas
        console.log("Fecha de fin:", endDate);

        if (startDate > endDate) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha de inicio no puede ser mayor que la fecha de fin.',
            });
            return;
        }

        const filteredSales = sales.filter(sale => {
            const saleDate = new Date(sale.date);
            console.log("Fecha de la venta:", saleDate);  // Verificar la fecha de cada venta
            return saleDate >= startDate && saleDate <= endDate;
        });

        console.log("Ventas filtradas:", filteredSales);  // Verificar que el filtrado funciona
        if (filteredSales.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No se encontraron ventas',
                text: 'No se encontraron ventas en el rango de fechas especificado.',
            });
        }
        
        displayReport(filteredSales);
    }

    function displayReport(filteredSales) {
        const reportItemsContainer = document.getElementById('report-items');
        const totalSalesContainer = document.getElementById('total-sales');
        reportItemsContainer.innerHTML = '';
        let totalSales = 0;
    
        if (filteredSales.length === 0) {
            reportItemsContainer.innerHTML = '<p>No se encontraron ventas en este rango de fechas.</p>';
        } else {
            const table = document.createElement('table');
            table.id = 'report-table';
    
            // Crear encabezados de tabla
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>Fecha</th><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th>';
            table.appendChild(headerRow);
    
            // Agregar filas de datos a la tabla
            filteredSales.forEach(sale => {
                sale.items.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${new Date(sale.date).toLocaleString()}</td>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>$${(item.quantity * item.price).toFixed(2)}</td>
                    `;
                    table.appendChild(row);
                    totalSales += item.quantity * item.price;
                });
            });
    
            reportItemsContainer.appendChild(table);
        }
    
        totalSalesContainer.textContent = `$${totalSales.toFixed(2)}`;
    }
    
});
