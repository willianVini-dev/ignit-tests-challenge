import { IStatementsRepository } from '../../repositories/IStatementsRepository';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { GetBalanceUseCase } from './GetBalanceUseCase';
import { CreateUserUseCase } from '../../../users/useCases/createUser/CreateUserUseCase';



let inMemoryUsersRepository:InMemoryUsersRepository;
let createUserUseCase:CreateUserUseCase;
let inMemoryStatementsRepository:IStatementsRepository;
let getBalanceUseCase:GetBalanceUseCase;
describe("Balance",()=>{

  beforeEach(()=>{
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository,inMemoryUsersRepository)
  })

  it("shoul be able to list balance for user", async ()=>{

    const user ={
      name: "willian",
      email: "willian@teste.com",
      password: "1234"
    }
    const newUser = await createUserUseCase.execute(user)
    const user_id = String(newUser.id)

    const infoBalance = await getBalanceUseCase.execute({user_id})
    expect(infoBalance).toHaveProperty("balance")


  })


})
