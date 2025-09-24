
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginComponent } from './login.component';
import { UserLoginRequest, UserLoginResponse, UserRegisterResponse } from '../../types/UserTypes';
import { render,screen } from '@testing-library/angular';
import { EmailDirective } from '../../directives/email.directive';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { UserService } from '../../services/user.service';
import userEvent from '@testing-library/user-event';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('LoginComponent', () => {

  afterEach(() => {
    jest.clearAllMocks();
  })

  test("should have label with text 'Email:'", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });

    const emailLabel = await screen.findByText("Email:")
    expect(emailLabel).toBeInTheDocument()
  })

  test("should have label with text 'Password:'", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });

    const passwordLabel = await screen.findByText("Password:")
    expect(passwordLabel).toBeInTheDocument()
  })

  test("should have button with text 'Login'", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });

    const loginBtn = await screen.findByRole("button", {name: /login/i})
    expect(loginBtn).toBeInTheDocument()
  })

  test("should have email input element", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });
    // name is actually the content text in Label element
    const emailInput = screen.getByRole("textbox", {name: "Email:"}) 
    expect(emailInput).toBeInTheDocument()
    expect(emailInput.textContent).toBe("")
    expect(emailInput).toHaveAttribute("type","text")
  })

   test("should not show message 'Email is required' without interaction with the input field", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });
    // name is actually the content text in Label element
    const emailInput = screen.getByRole("textbox", {name: "Email:"}) 
    expect(emailInput).toBeInTheDocument()
    const emailIsRequired = screen.queryByText(new RegExp("email is required","i"))
    expect(emailIsRequired).not.toBeInTheDocument();
  })

  test("should show 'Email is required' message if the user leave the email input field empty", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });
    // name is actually the content text in Label element
    const emailInput = screen.getByRole("textbox", {name: "Email:"}) 
    expect(emailInput).toBeInTheDocument()
    const user = userEvent.setup()
    await user.click(emailInput)
    await user.tab();
    const emailIsRequired = await screen.findByText(new RegExp("email is required","i"))
    expect(emailIsRequired).toBeInTheDocument();
  })

  test("should show 'Invalid Email' message if the user enters invalid email format", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });
    // name is actually the content text in Label element
    const emailInput = screen.getByRole("textbox", {name: "Email:"}) 
    expect(emailInput).toBeInTheDocument()
    const user = userEvent.setup()
    await user.click(emailInput)
    await user.type(emailInput,"ivo")
    await user.tab();
    const emailIsRequired = await screen.findByText(new RegExp("invalid email","i"))
    expect(emailIsRequired).toBeInTheDocument();
  })

  test("should not show 'Invalid Email' message without interaction with the input field", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });
    // name is actually the content text in Label element
    const emailInput = screen.getByRole("textbox", {name: "Email:"}) 
    expect(emailInput).toBeInTheDocument()
    const emailIsRequired = screen.queryByText(new RegExp("invalid email","i"))
    expect(emailIsRequired).not.toBeInTheDocument();
  })

   test("should have password input element", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });
     const passwordInput = screen.getByLabelText("Password:") // selects password input field by the label name
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput.textContent).toBe("")
    expect(passwordInput).toHaveAttribute("type","password")
  })

   test("should show message 'Password is required' if the user leave the password input empty", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });
     const passwordInput = screen.getByLabelText("Password:") // selects password input field by the label content
     const user = userEvent.setup();
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput.textContent).toBe("")
    expect(passwordInput).toHaveAttribute("type","password")
    await user.click(passwordInput);
    await user.tab();
    const message = await screen.findByText("Password is required");
    expect(message).toBeInTheDocument();
  })

   test("should not show message 'Password is required' without interaction with the password input field", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });
    const passwordInput = screen.getByLabelText("Password:") // selects password input field by the label content
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput.textContent).toBe("")
    expect(passwordInput).toHaveAttribute("type","password")
    const message = screen.queryByText("Password is required");
    expect(message).not.toBeInTheDocument();
  })

  test("clicking on button 'Login' should not call onLogin(),userService.login() methods if both email and password fields are empty", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    const { fixture } = await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });
    // name is actually the content text in Label element
    const loginComponent = fixture.componentInstance;
    const onLoginSpy = jest.spyOn(loginComponent,"onLogin")
    const emailInput = screen.getByRole("textbox", {name: "Email:"}) 
    expect(emailInput).toBeInTheDocument()
    expect(emailInput.textContent).toBe("")
    const passwordInput = screen.getByLabelText("Password:") // selects password input field by the label name
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput.textContent).toBe("")
    const loginButton = await screen.findByRole("button",{name: /login/i})
    expect(loginButton).toBeInTheDocument();
    const user = userEvent.setup()
    await user.click(loginButton)
    expect(onLoginSpy).toHaveBeenCalledTimes(0)
  })

  test("clicking on button 'Login' should invoke onLogin(),userService.login() methods", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    const { fixture } = await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        },
      ]
    });
    // name is actually the content text in Label element
    const loginComponent = fixture.componentInstance;
    const onLoginSpy = jest.spyOn(loginComponent,"onLogin")
    const userServiceLoginSpy = jest.spyOn(userService,"login")
    const user = userEvent.setup()
    const emailInput = screen.getByRole("textbox", {name: "Email:"}) 
    expect(emailInput).toBeInTheDocument()
    await user.type(emailInput,"ivan@abv.bg")
    const passwordInput = screen.getByLabelText("Password:") // selects password input field by the label name
    expect(passwordInput).toBeInTheDocument()
    await user.type(passwordInput,"123456")
    const loginButton = await screen.findByRole("button",{name: /login/i})
    expect(loginButton).toBeInTheDocument();
    await user.click(loginButton)
    expect(onLoginSpy).toHaveBeenCalledTimes(1)
    expect(userServiceLoginSpy).toHaveBeenCalledTimes(1)
    expect(userServiceLoginSpy).toHaveBeenCalledWith({email: "ivan@abv.bg", password: "123456"})
  })

});
