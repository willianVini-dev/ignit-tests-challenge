import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreateStatementUseCase } from '../createStatement/CreateStatementUseCase';
import { ICreateStatementDTO } from '../createStatement/ICreateStatementDTO';
import { GetStatementOperationUseCase } from './GetStatementOperationUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

let createUserUseCase:CreateUserUseCase;
let inMemoryUserRepository:IUsersRepository;
let createStatementUseCase:CreateStatementUseCase;
let inMemoryStatementsRepository:InMemoryStatementsRepository;
let getStatementOperationUseCase:GetStatementOperationUseCase;

describe("Deposit operator", ()=>{

  beforeEach(()=>{
    inMemoryUserRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    createStatementUseCase = new CreateStatementUseCase(inMemoryUserRepository,inMemoryStatementsRepository)
    getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUserRepository, inMemoryStatementsRepository)
  })

  it("shoul be able list operation for user", async()=>{

    const user = {
      name: "willian",
      email: "willian@teste.com",
      password: "1234"
    }

    const newUser = await createUserUseCase.execute(user)
    const user_id = String(newUser.id)

    const info1:ICreateStatementDTO = {
      user_id,
      type:OperationType.DEPOSIT,
      amount: 100,
      description: "deposito!"
    }
    const infoOperator = await createStatementUseCase.execute(info1)

    const infoStatement = {
      user_id,
      statement_id: String(infoOperator.id)
    }

    const statement = await getStatementOperationUseCase.execute(infoStatement)
    expect(statement.user_id).toEqual(user_id)
    expect(statement.id).toEqual(infoOperator.id)

  })


});
