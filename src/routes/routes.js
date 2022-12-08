const HandlerController = require('../controllers/HandlerController.js');

const routes = [
  {
    path: '/',
    method: 'GET',
    handler: (request, h) => {
      return h.response({message: 'Homepage'}).code(200);
    },
  },
  {
    path: '/notes',
    method: 'POST',
    handler: HandlerController.addNoteHandler,
  },
  {
    path: '/notes',
    method: 'GET',
    handler: HandlerController.getAllNotesHandler,
  },
  {
    path: '/notes/{id}',
    method: 'GET',
    handler: HandlerController.getNoteByIdHandler,
  },
  {
    path: '/notes/{id}',
    method: 'PUT',
    handler: HandlerController.editNoteByIdHandler,
  },
  {
    path: '/notes/{id}',
    method: 'DELETE',
    handler: HandlerController.deleteNoteByIdHandler,
  },
];

module.exports = routes;
