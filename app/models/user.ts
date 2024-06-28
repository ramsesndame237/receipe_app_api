import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column } from "@adonisjs/lucid/orm";
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { v4 as uuidv4 } from 'uuid'
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['uuid'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static selfAssignPrimaryKey  = true
  @column({ isPrimary: true, })
  declare uuid: string

  @column()
  declare fullName: string | null

  @column()
  declare email: string


  @column()
  declare terms_conditions: boolean

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null


  @beforeCreate()
  static assignUuid(user:User){
    user.uuid = uuidv4()
  }
  static accessTokens = DbAccessTokensProvider.forModel(User,{
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}
