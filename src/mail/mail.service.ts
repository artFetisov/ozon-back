import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { IEmailSendCode } from './types/mailData.types'

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendMail({ to, code, message }: IEmailSendCode) {
		await this.mailerService.sendMail({
			to,
			subject: 'Отправка кода верификации',
			template: 'code',
			context: {
				code,
				message,
			},
		})
	}
}
