import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes of the model
interface TokenAttributes {
  id: number;
  user_id: number;
  refreshToken: string;
  revoked: boolean;
  revokedAt?: Date | null;
  // createdAt: Date;
  // updatedAt: Date;
}

// Define which attributes are optional when creating a new instance
interface TokenCreationAttributes extends Optional<
  TokenAttributes,
  'id' | 'revoked' | 'revokedAt'
> {}

// Define the model class
export class Token
  extends Model<TokenAttributes, TokenCreationAttributes>
  implements TokenAttributes
{
  public id!: number;
  public user_id!: number;
  public refreshToken!: string;
  public revoked!: boolean;
  public revokedAt!: Date | null;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Initialize the model
export const initTokenModel = (sequelize: Sequelize) => {
  Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      revoked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      revokedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tokens',
      timestamps: true, // ensures Sequelize manages createdAt/updatedAt
    }
  );

  return Token;
};
