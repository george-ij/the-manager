'use strict'

/**
 * Resourceful controller for interacting with logs
 */
class LogController {
  /**
   * Show a list of all logs.
   * GET logs
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new log.
   * GET logs/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new log.
   * POST logs
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single log.
   * GET logs/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing log.
   * GET logs/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update log details.
   * PUT or PATCH logs/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a log with id.
   * DELETE logs/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = LogController
