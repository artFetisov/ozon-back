import { Injectable } from '@nestjs/common'
import { ICreateTemporaryAuthData } from './types/createTemporaryAuthData'
import { InjectModel } from '@nestjs/sequelize'
import { TemporaryAuthData } from './temporary-auth-data.model'

@Injectable()
export class TemporaryAuthDataService {
  constructor(
    @InjectModel(TemporaryAuthData)
    private readonly temporaryAuthDataRepository: typeof TemporaryAuthData
  ) {}

  async createTemporaryAuthData(data: ICreateTemporaryAuthData) {
    const foundedData = await this.temporaryAuthDataRepository.findOne({
      where: { property: data.property },
      include: { all: true },
    })

    if (!foundedData) {
      await this.temporaryAuthDataRepository.create({ ...data })
      return
    }

    await foundedData.update({ ...data })
  }
}
