const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const upload = require("../middlewares/file.middleware")
const { generateInterViewReportController, getInterviewReportByIdController, generateResumePdfController } = require("../controllers/interviewController")
const { getAllInterviewReports } = require("../../../client/src/features/interview/services/interview.api")


const interviewRouter = express.Router()



/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), generateInterViewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, getInterviewReportByIdController)


/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authMiddleware.authUser, getAllInterviewReports)


/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, generateResumePdfController)



module.exports = interviewRouter