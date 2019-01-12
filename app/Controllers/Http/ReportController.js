'use strict'
const User = use('App/Models/User')
const GeneralReport = use('App/Models/GeneralReport')
const ContactReport = use('App/Models/ContactReport')
const moment = use('moment')

class ReportController {
    async generalReportForm({ view, auth }) {
        return view.render('user/report/general_report', {
            profileID: auth.user.id
        })
    }

    async createGeneralReport({ request, view, auth }) {
        const newGeneralReport = new GeneralReport()

        const title = request.input('title')
        const details = request.input('details')

        newGeneralReport.user_id = auth.user.id
        newGeneralReport.title = title
        newGeneralReport.details = details

        await newGeneralReport.save()

        const user_id = await User.find(newGeneralReport.user_id)

        return view.render('user/report/general_report_display', {
            user_id: user_id.toJSON(),
            newGeneralReport: newGeneralReport.toJSON(),
        })
    }

    async contactReportForm({ view, auth }) {
        const user = await User.all()
        // const auth_userID = auth.user.id

        // const user_id = await User.find(auth_userID)

        return view.render('user/report/contact_report', {
            users: user.toJSON(),
            // user_id: user_id.toJSON()
        })
    }

    async createContactReport({ request, view, auth }) {
        const newContactReport = new ContactReport()

        const Subject = request.input('subject')
        const meetingLocation = request.input('location')
        const meetingDate = request.input('meeting_date')

        const currentMonth = (moment().month() + 1).toString()
        const currentYear = moment().year().toString().slice(2)

        const countContactReports = await ContactReport.getCount()
        const serialNumber = `10${countContactReports}`

        const contactReportNumber = `CRN/${currentYear}/${currentMonth}/${serialNumber}`
        console.log(`CRN=======>>>> ${contactReportNumber}`)

        const companyName = request.input('client_name')
        const clientAttendees = request.input('client_attendees')
        const agencyAttendees = request.input('agency_attendees')
        const thirdPartyAttendees = request.input('third_party_attendees')
        const meetingSummary = request.input('meeting_summary')
        const actionPoint = request.input('action_points')
        const actionAssignedUser = request.input('assigned_action_user')

        newContactReport.user_id = auth.user.id
        newContactReport.Subject = Subject
        newContactReport.meetingLocation = meetingLocation
        newContactReport.meetingDate = meetingDate
        newContactReport.contactReportNumber = contactReportNumber
        newContactReport.companyName = companyName
        newContactReport.clientAttendees = clientAttendees
        newContactReport.agencyAttendees = agencyAttendees
        newContactReport.thirdPartyAttendees = thirdPartyAttendees
        newContactReport.meetingSummary = meetingSummary
        newContactReport.actionPoint = actionPoint
        newContactReport.actionAssignedUser = actionAssignedUser

        await newContactReport.save()

        const user_id = await User.find(newContactReport.user_id)

        const agency_attendees = await User.find(newContactReport.agencyAttendees)

        const action_assigned_user = await User.find(newContactReport.actionAssignedUser)

        return view.render('user/report/contact_report_display', {
            user_id: user_id.toJSON(),
            newContactReport: newContactReport.toJSON(),
            agencyAttendees: agency_attendees.toJSON(),
            actionAssignedUser: action_assigned_user.toJSON()
        })
    }
}

module.exports = ReportController
