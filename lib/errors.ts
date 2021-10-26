import { ApiRejection } from "./core"

/** 不包括服务器返回的其他具体错误 */
export enum ErrorCode {
	ClientNotOnline = -1,
	PacketTimeout = -2,

	UserNotExists = -10,
	GroupNotJoined = -20,
	MemberNotExists = -30,

	MessageBuildingFailure = -60,
	RiskMessageFailure = -70,
	SensitiveWordsFailure = -80,

	HighwayTimeout = -110,
	HighwayNetworkError = -120,
	NoUploadChannel = -130,

	OfflineFileNotExists = -160,

	FFmpegVideoThumbError = -210,
	FFmpegPttTransError = -220,
}

const ErrorMessage: {[code: number]: string} = {
	[ErrorCode.UserNotExists]: "查无此人",
	[ErrorCode.GroupNotJoined]: "未加入的群",
	[ErrorCode.MemberNotExists]: "幽灵群员",
	[ErrorCode.RiskMessageFailure]: "群消息发送失败，可能被风控",
	[ErrorCode.SensitiveWordsFailure]: "群消息发送失败，请检查消息内容",
	10: "消息过长",
	34: "消息过长",
	120: "在该群被禁言",
}

export function drop(code: number, message?: string): never {
	if (!message || !message.length)
		message = ErrorMessage[code]
	throw new ApiRejection(code, message)
}

/** 不在内的都属于未知错误，暂时不在解决范围 */
export enum LoginErrorCode {
	ScanUinError = 0,
	ScanTimeout = 17,
	ScanCancelled = 54,
	WrongPassword = 1,
	AccountFrozen = 40,
	TooManySms = 162,
	WrongSmsCode = 163,
	WrongTicket = 237,
}
