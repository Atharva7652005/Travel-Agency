document.addEventListener('DOMContentLoaded', () => {
    const seatMap = document.getElementById('seat-map');
    if (!seatMap) return;

    const totalSeats = parseInt(seatMap.getAttribute('data-total'));
    const takenSeats = JSON.parse(seatMap.getAttribute('data-taken'));
    const pricePerSeat = parseFloat(seatMap.getAttribute('data-price'));
    
    const selectedSeatsInput = document.getElementById('selected-seats');
    const totalPriceEl = document.getElementById('total-price');
    const bookBtn = document.getElementById('book-btn');

    let selectedSeats = [];
    const seatsPerRow = 6; // E.g. A1, A2, A3, A4, A5, A6
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Render seats iteratively into rows
    let currentSeatNumber = 1;
    let currentRowIndex = 0;

    // Use a wrapper for BookMyShow CSS layout
    const seatWrapper = document.createElement('div');
    seatWrapper.style.display = 'flex';
    seatWrapper.style.flexDirection = 'column';
    seatWrapper.style.alignItems = 'center';
    
    while (currentSeatNumber <= totalSeats) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'seat-row';

        // Row Label
        const rowLabel = document.createElement('div');
        rowLabel.className = 'row-label';
        rowLabel.textContent = alphabet[currentRowIndex];
        rowDiv.appendChild(rowLabel);

        // Render seats for this row
        for (let i = 0; i < seatsPerRow && currentSeatNumber <= totalSeats; i++) {
            const seat = document.createElement('div');
            // Give it an absolute semantic ID like 'A1' but its actual value is currentSeatNumber
            const seatLogicId = currentSeatNumber; 
            
            seat.classList.add('seat');
            
            // Wait, we need to show labels on hover or just rely on the grid semantics. Let's make it visible on selected!
            seat.textContent = currentSeatNumber; // Keep text transparent via CSS, but when selected it toggles white.
            seat.dataset.seatNumber = seatLogicId;
            seat.title = `Seat ${alphabet[currentRowIndex]}${i+1} (Ticket #${seatLogicId})`;

            if (takenSeats.includes(seatLogicId)) {
                seat.classList.add('booked');
            } else {
                seat.addEventListener('click', () => {
                    if (seat.classList.contains('selected')) {
                        seat.classList.remove('selected');
                        selectedSeats = selectedSeats.filter(s => s !== seatLogicId);
                    } else {
                        seat.classList.add('selected');
                        selectedSeats.push(seatLogicId);
                    }
                    updateUI();
                });
            }

            rowDiv.appendChild(seat);
            currentSeatNumber++;
        }
        
        seatWrapper.appendChild(rowDiv);
        currentRowIndex++;
    }

    seatMap.appendChild(seatWrapper);

    function updateUI() {
        if (selectedSeats.length > 0) {
            bookBtn.disabled = false;
        } else {
            bookBtn.disabled = true;
        }

        const total = selectedSeats.length * pricePerSeat;
        
        // Count up animation logic for price
        animateValue(totalPriceEl, total);
        
        selectedSeatsInput.value = selectedSeats.join(',');
    }

    function animateValue(obj, end) {
        // Fast numeric interpolation
        obj.textContent = '₹' + end.toLocaleString('en-IN');
        // We can add a quick CSS pop 
        obj.style.transform = 'scale(1.2)';
        obj.style.color = 'var(--primary-color)';
        setTimeout(() => {
            obj.style.transform = 'scale(1)';
            obj.style.color = 'inherit';
        }, 150);
    }
});
