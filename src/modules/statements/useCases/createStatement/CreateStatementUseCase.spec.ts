import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreateStatementUseCase } from './CreateStatementUseCase';
import { ICreateStatementDTO } from './ICreateStatementDTO';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

let createUserUseCase:CreateUserUseCase;
let inMemoryUserRepository:IUsersRepository;
let createStatementUseCase:CreateStatementUseCase;
let inMemoryStatementsRepository:InMemoryStatementsRepository;

describe("Deposit operator", ()=>{

  beforeEach(()=>{
    inMemoryUserRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    createStatementUseCase = new CreateStatementUseCase(inMemoryUserRepository,inMemoryStatementsRepository)
  })

  it("shoul be able register operator deposit", async()=>{

    const user = {
      name: "willian",
      email: "willian@teste.com",
      password: "1234"
    }

    const newUser = await createUserUseCase.execute(user)
    const user_id = String(newUser.id)

    const info:ICreateStatementDTO = {
      user_id,
      type:OperationType.DEPOSIT,
      amount: 100,
      description: "deposito!"
    }
    const infoOperator = await createStatementUseCase.execute(info)
    expect(infoOperator).toHaveProperty("id")

  })

  it("shoul be able register operator withdraw", async()=>{

    const user = {
      name: "willian",
      email: "willian@teste.com",
      password: "1234"
    }

    const newUser = await createUserUseCase.execute(user)
    const user_id = String(newUser.id)

    const info:ICreateStatementDTO = {
      user_id,
      type:OperationType.DEPOSIT,
      amount: 100,
      description: "deposito!"
    }
    const infoOperator = await createStatementUseCase.execute(info)

    const infoS:ICreateStatementDTO = {
      user_id,
      type:OperationType.WITHDRAW,
      amount: 90,
      description: "saque!"
    }
    const infoOperatorS = await createStatementUseCase.execute(infoS)
    expect(infoOperatorS.type).toEqual("withdraw")
    expect(infoOperatorS).toHaveProperty("id")

  })
});
