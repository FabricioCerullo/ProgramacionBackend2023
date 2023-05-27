export class CreateUserDTO {
    constructor(user){
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.password = user.password;
        this.age = user.age;
        this.role = user.role;
        this.nombreCompleto = `${user.first_name}${user.last_name}`
    }
}


export class GetProductDTO{
    constructor(prod){
        this.title = prod.title;
        this.price = prod.price;
        this.stock = prod.stock;
    }
}

export class GetUserDTO{
    constructor(user) {
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.role = user.role;
    }
}