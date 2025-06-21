const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
  const ticket = await Ticket.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(ticket);
};

exports.getMyTickets = async (req, res) => {
  const tickets = await Ticket.find({ createdBy: req.user._id });
  res.json(tickets);
};

exports.getAllTickets = async (req, res) => {
  const { status, priority, search, page = 1, limit = 10 } = req.query;
  const query = {};
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (search) query.title = new RegExp(search, 'i');

  const tickets = await Ticket.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(tickets);
};

exports.getTicketById = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ message: 'Not found' });
  res.json(ticket);
};

exports.updateTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ message: 'Not found' });

  if (req.user.role !== 'agent' && !ticket.createdBy.equals(req.user._id))
    return res.status(403).json({ message: 'Forbidden' });

  Object.assign(ticket, req.body);
  await ticket.save();
  res.json(ticket);
};

exports.deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ message: 'Not found' });

  if (req.user.role !== 'agent' && !ticket.createdBy.equals(req.user._id))
    return res.status(403).json({ message: 'Forbidden' });

  await ticket.remove();
  res.json({ message: 'Deleted' });
};
