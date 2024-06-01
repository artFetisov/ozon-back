import { Injectable } from '@nestjs/common'
import { MailService } from 'src/mail/mail.service'
import { IMailData } from 'src/mail/types/mailData.types'

@Injectable()
export class UserService {
  constructor(private readonly mailService: MailService) {}

  async registration() {
    return this.mailService.sendMail()
  }
}
