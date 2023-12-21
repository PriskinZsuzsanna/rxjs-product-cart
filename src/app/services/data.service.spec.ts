import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Item } from '../types/interface';

fdescribe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  afterEach(() => {
    httpTestingController.verify();
  });

  //created

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //get data
  it('should get data from the API', () => {
    const testData = {
      items: [{
        "id": 1,
        "group": "sneaker company",
        "title": "fall limited edition sneakers",
        "text": "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
        "price": 125,
        "discount": 0.5
      }]
    };

    // Subscribe to the data$ Observable and expect the result
    service.data$.subscribe((data) => {
      expect(data).toEqual(testData.items);
    });

    // Set up a mock HTTP request
    const req = httpTestingController.expectOne('assets/data.json');
    expect(req.request.method).toEqual('GET');

    // Respond with the mock data
    req.flush(testData);

    // After the flush, the subscription in the test will receive the data
  });

  it('should handle HTTP error and return EMPTY', () => {
    // Subscribe to the data$ Observable and expect it to return EMPTY
    service.data$.subscribe((data) => {
      expect(data).toEqual([]);
    });

    // Set up a mock HTTP request
    const req = httpTestingController.expectOne('assets/data.json');
    expect(req.request.method).toEqual('GET');

    // Respond with an error
    req.error(new ErrorEvent('Network error'));

    // After the error, the subscription in the test will receive EMPTY
  });

  //get actual from data
  it('should emit the correct item from actual$', fakeAsync(() => {
    const testData = {
      items: [
        {
          id: 1,
          group: 'sneaker company',
          title: 'fall limited edition sneakers',
          text: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they\'ll withstand everything the weather can offer.',
          price: 125,
          discount: 0.5,
        },
      ],
    };

    // Set the idParam to a specific value
    service.idParam = 1;

    // Subscribe to the actual$ Observable and expect the result
    let actualItem: any;
    service.actual$.subscribe((item) => {
      actualItem = item;
    });

    // Set up a mock HTTP request for data$
    const dataRequest = httpTestingController.expectOne('assets/data.json');
    dataRequest.flush(testData);

    // Simulate the passage of time until the observable is resolved
    tick();

    // Expectations
    expect(actualItem).toEqual(testData.items[0]);
  }));

  it('should handle actual$ when idParam does not match any item', fakeAsync(() => {
    const testData = {
      items: [{
        "id": 1,
        "group": "sneaker company",
        "title": "fall limited edition sneakers",
        "text": "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
        "price": 125,
        "discount": 0.5
      }]
    };

    // Set the idParam to a value that doesn't match any item
    service.idParam = 999;

    // Subscribe to the actual$ Observable and expect the result
    let actualItem: any;
    service.actual$.subscribe((item) => {
      actualItem = item;
    });

    // Set up a mock HTTP request for data$
    const dataRequest = httpTestingController.expectOne('assets/data.json');
    dataRequest.flush(testData);

    // Simulate the passage of time until the observable is resolved
    tick();

    // Expectations
    expect(actualItem).toBeUndefined();
  }));

  //Subjects
  it('should emit the initial value for chartNumberObservable$', () => {
    let chartNumberValue: number | undefined;

    // Subscribe to the observable and store the emitted value
    service.chartNumberObservable$.subscribe((value) => {
      chartNumberValue = value;
    });

    // Expect the initial value
    expect(chartNumberValue).toBe(0);
  });

  it('should update chartNumberObservable$ when chartNumberSubject changes', () => {
    let chartNumberValue: number | undefined;

    // Subscribe to the observable and store the emitted value
    service.chartNumberObservable$.subscribe((value) => {
      chartNumberValue = value;
    });

    // Change the chartNumberSubject value
    service.chartNumberSubject.next(42);

    // Expect the updated value
    expect(chartNumberValue).toBe(42);
  });

  it('should emit the initial value for cartSubject', () => {
    let cartSubjectValue: {id:number, quantity: number}[] | []
    service.cartObservable$.subscribe((value) => {
      cartSubjectValue = value
      expect(cartSubjectValue).toEqual([])
    })
  })

  it('should has the updated value', () => {
    let cartSubjectValue: {id:number, quantity: number}[] | [] = []
    service.cartObservable$.subscribe((value) => {
      cartSubjectValue = value
    })
    service.cartSubject.next([{id:1, quantity: 3}])
    expect(cartSubjectValue).toEqual([{id:1, quantity: 3}])
  })

  it('should not show cart initially', () => {
    let showState: boolean = false
    service.showCartObservable$.subscribe((value) => {
      showState = value
    })
    expect(showState).toBe(false)
  })

  it('should toggle state', () => {
    let showState: boolean = false
    service.showCartObservable$.subscribe((value) => {
      showState = value
    })

    service.showCartSubject.next(true)
    expect(showState).toBe(true)
  })

  //items in cart combined with quantity
  it('should map items from cartObservable$ to data items with quantity', fakeAsync(() => {
    const testData = {
      items: [{
        "id": 1,
        "group": "sneaker company",
        "title": "fall limited edition sneakers",
        "text": "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
        "price": 125,
        "discount": 0.5
      }]
    };
    const cartItems = [
      {id: 1, quantity: 3}
    ]

    service.cartSubject.next(cartItems)

    let itemsInCart : (Item & {quantity: number})[] | undefined
    service.itemsInCart$.subscribe((res) => {
      itemsInCart = res
    })

    const dataReq = httpTestingController.expectOne('assets/data.json')
    dataReq.flush(testData)

    tick()

    expect(itemsInCart).toEqual([
      {
        id: 1,
        group: "sneaker company",
        title: "fall limited edition sneakers",
        text: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
        price: 125,
        discount: 0.5,
        quantity: 3
      }
    ])
  }))

  //count

  it('should increment numbers with one, when called with "+"', () => {
    let actual = service.actualCount
    service.count('+');
    expect(service.actualCount).toEqual(actual + 1)
  });

  it('should decrement numbers with one, when called with "-"', () => {
    let actual = service.actualCount
    let decrement = actual == 0 ? 0 : 1
    service.count('-');
    expect(service.actualCount).toEqual(actual - decrement)
  })

  it('should show 0, when we decrement from 0', () => {
    let actual = 0
    service.count('-')
    expect(service.actualCount).toBe(actual)
  })

  //toggle

  it('should toggle cart visibility', () => {
    const initialValue = service.showCartSubject.value;
    service.toggleCart()
    const updatedValue = service.showCartSubject.value;
    expect(updatedValue).toEqual(!initialValue)
  })

  //add item with quantity

  it('should add the correct Item, with correct quantity', () => {
    const itemId = 1;
    const quantity = 3;
    const initialItemsInCart: any = []

    service.chartNumberSubject.next(quantity)
    service.cartSubject.next(initialItemsInCart)

    service.addToCart(itemId)
    const updatedCartItems = service.cartSubject.value

    expect(updatedCartItems.length).toBe(1)
    expect(updatedCartItems[0].id).toBe(itemId);
    expect(updatedCartItems[0].quantity).toBe(quantity)
  })

  it('should update quantity', () => {
    const itemId = 1;
    const quantity = 5;
    const initialItemsInCart: any = [{
      id: 1,
      quantity: 3
    }]

    service.chartNumberSubject.next(quantity)
    service.cartSubject.next(initialItemsInCart)

    service.addToCart(itemId)
    const updatedCartItems = service.cartSubject.value

    expect(updatedCartItems.length).toBe(1)
    expect(updatedCartItems[0].id).toBe(itemId);
    expect(updatedCartItems[0].quantity).toBe(quantity)
  })

  //total quantity
  it('should calculate the total quantity correctly', () => {
    const cartItems = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
      { id: 3, quantity: 1 },
    ];

    service.cartSubject.next(cartItems);

    let result: number | undefined;
    service.getTotalQuantity().subscribe((quantity) => (result = quantity));

    expect(result).toBe(2 + 3 + 1);
  });

  it('should handle an empty cart correctly', () => {
    service.cartSubject.next([]);

    let result: number | undefined;
    service.getTotalQuantity().subscribe((quantity) => (result = quantity));

    expect(result).toBe(0);
  });

  it('should delete item with given id, and call toggle if cart is empty', () => {
    const items = [{
      id: 1,
      quantity: 3
    }]

    spyOn(service, 'toggleCart');

    service.cartSubject.next(items)

    service.deleteItem(1)

    const cart = service.cartSubject.value
    const visible = service.showCartSubject.value

    expect(cart.length).toBe(0)
    expect(service.toggleCart).toHaveBeenCalledTimes(1)
  })

  it('should delete item with given id', () => {
    const items = [{
      id: 1,
      quantity: 3
    },
    {
      id: 2,
      quantity: 2
    }]

    spyOn(service, 'toggleCart');

    service.cartSubject.next(items)

    service.deleteItem(1)

    const cart = service.cartSubject.value
    const visible = service.showCartSubject.value

    expect(cart.length).toBe(items.length - 1)
    expect(service.toggleCart).toHaveBeenCalledTimes(0)
  })

})
