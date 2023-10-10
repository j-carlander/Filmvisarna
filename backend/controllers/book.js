export function addBooking (req, res) {

const {seats, guestEmail, guestPhone} = req.body;

console.log(seats, guestEmail, guestPhone);

res.status(201).send("booking confirmed");
}


