
export const initOrderedFood = (data) => {
    const newData = data.map((item, index) => {
        const newItem = { ...item, quanityOrdered: 0 };
        return newItem;
    })
    return newData;
}

export const configPrice = (data) => {
    const newData = (parseFloat(data)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    return newData;
}

export const configState = (state) =>{
    if (state == -1) {
        return 'Cancel'
    } else if (state == 0) {
        return 'Pending'
    } else if (state == 1) {
        return 'Completed'
    }
}

export const configDataOrderPost = (dataOrder, dataClient) => {
    const idUser = sessionStorage.getItem('USER_KEY');
    const idFood = dataOrder.map((item, index) => {
        const id = item?._id;
        return id;
    });
    const quanityFood = dataOrder.map((item, index) => {
        const quanity = item?.quanityOrdered;
        return quanity;
    })
    const name = dataClient.name;
    const phoneNumber = dataClient.phoneNumber;
    const address = dataClient.address + ", " + dataClient.province;
    
    const note = dataClient.note;

    return {
        books: dataOrder,
        quanityList: quanityFood,
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        note: note,
    }
}

export const configDataBookingPost = (data) => {
    const store = data.store;
    const numberOfPeople = data.numberPp;
    let time;
    const note = data.note;
    const phone = data.phone;

    return {
        store: store,
        people: numberOfPeople,
        note: note,
        phone: phone,
        date: time,
        booker: data.name,
        id: Math.floor(Math.random()*888888)+100000
    }
}

export const configPhoneNumber = (phonenumber) =>{
    if(phonenumber.length == 10){
        return '+84'+ (phonenumber +'').substring(1, (phonenumber +'').length);
    }else if(phonenumber.length == 12){
        return phonenumber;
    }
}
