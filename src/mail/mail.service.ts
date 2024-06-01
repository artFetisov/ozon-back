import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { IMailData } from './types/mailData.types'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail() {
    const code = '888999'

    await this.mailerService.sendMail({
      to: 'fetishfestoff@mail.ru',
      from: 'fetishfestoff@mail.ru',
      subject: 'Отправка кода верификации',
      template: 'code',
      context: {
        code,
      },
    })
  }
}
