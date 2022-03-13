
import { InMemoryUsersRepository } from './../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let createUserUseCase:CreateUserUseCase;
let inMemoryUserRepository:IUsersRepository;
let authenticateUserUseCase:AuthenticateUserUseCase;
describe("Create User", ()=>{

  beforeAll(()=>{

    inMemoryUserRepository  = new InMemoryUsersRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUserRepository)
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)

  });

  it("should be able available user", async ()=>{

    const email    = "teste@teste.com"
    const password = "1234567890"
    await createUserUseCase.execute({name: "teste-teste",email,password})

    const res = await authenticateUserUseCase.execute({email,password})
    expect(res).toHaveProperty("token")

  })

})
