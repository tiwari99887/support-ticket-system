const express = require('express');
const {
  createTicket, getAllTickets, getMyTickets, getTicketById,
  updateTicket, deleteTicket
} = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', authorize('user'), createTicket);
router.get('/', authorize('agent', 'admin'), getAllTickets);
router.get('/my', authorize('user'), getMyTickets);
router.get('/:id', authorize('user', 'agent'), getTicketById);
router.patch('/:id', updateTicket);
router.delete('/:id', deleteTicket);

module.exports = router;
         