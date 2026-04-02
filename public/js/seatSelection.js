document.addEventListener('DOMContentLoaded', () => {
    const seatContainer = document.getElementById('seat-container');
    const selectedSeatsInput = document.getElementById('selected-seats-input');
    const bookBtn = document.getElementById('book-btn');
    const totalPriceEl = document.getElementById('total-price');

    if (!seatContainer) return; // Only run on package details page

    const totalSeats = parseInt(seatContainer.dataset.total);
    const pricePerSeat = parseFloat(seatContainer.dataset.price);
    const takenSeatsText = seatContainer.dataset.taken;
    
    let takenSeats = [];
    try {
        takenSeats = JSON.parse(takenSeatsText);
    } catch(e) {}

    let selectedSeats = [];

    // Initialize seats
    for (let i = 1; i <= totalSeats; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = i;
        seat.dataset.seatNumber = i;

        if (takenSeats.includes(i)) {
            seat.classList.add('booked');
        } else {
            seat.addEventListener('click', () => toggleSeat(seat, i));
        }

        seatContainer.appendChild(seat);
    }

    function toggleSeat(seatElement, seatNumber) {
        if (selectedSeats.includes(seatNumber)) {
            // Deselect
            selectedSeats = selectedSeats.filter(s => s !== seatNumber);
            seatElement.classList.remove('selected');
        } else {
            // Select
            selectedSeats.push(seatNumber);
            seatElement.classList.add('selected');
        }

        updateUI();
    }

    function updateUI() {
        if (selectedSeats.length > 0) {
            bookBtn.disabled = false;
        } else {
            bookBtn.disabled = true;
        }

        const total = selectedSeats.length * pricePerSeat;
        totalPriceEl.textContent = '₹' + total.toLocaleString('en-IN');
        selectedSeatsInput.value = selectedSeats.join(',');
    }
});
