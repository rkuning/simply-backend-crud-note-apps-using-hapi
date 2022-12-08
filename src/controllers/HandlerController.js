/* eslint-disable require-jsdoc */
const {nanoid} = require('nanoid');
const notes = require('../data/notes');

class HandlerController {
  static addNoteHandler(request, h) {
    const {title, tags, body} = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {id, title, tags, body, createdAt, updatedAt};

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan!',
        data: {
          noteId: id,
        },
      })
          .code(201);
      return response;
    }

    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan!',
    });
    response.code(500);
    return response;
  }

  static getAllNotesHandler() {
    return ({
      status: 'success',
      data: {
        notes,
      },
    });
  }

  static getNoteByIdHandler(request, h) {
    const {id} = request.params;

    const note = notes.filter((note) => note.id === id)[0];

    if (note !== undefined) {
      return {
        status: 'success',
        data: {
          note,
        },
      };
    };

    return h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    }).code(404);
  }

  static editNoteByIdHandler(request, h) {
    const {id} = request.params;

    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      notes[index] = {...notes[index], title, tags, body, updatedAt};

      return h.response({
        status: 'success', message: 'Catatan berhasil diperbarui'}).code(200);
    }

    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan'}).code(404);
  }

  static deleteNoteByIdHandler(request, h) {
    const {id} = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      notes.splice(index, 1);
      return h.response({
        status: 'success', message: 'Catatan berhasil dihapus'}).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }
}
module.exports = HandlerController;
