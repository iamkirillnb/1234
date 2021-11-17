'use strict'

let text = `or aren't.
Linda will be very busy next week. On
Monday she ... going to write a letter to her
pen friend Paul. On Tuesday Linda and
her mother ... going to visit their granny.
When ... Linda going to arrange her
birthday party? - On Sunday, Linda loves
pets. Her friends... going to give her a kit-
ten, they? And Linda' s parents
going to give her a camera.
you going to come to Linda' s par-
Ty?`
let text_div = document.getElementById("text");
text_div.insertAdjacentHTML('beforeend', `<p>${text}</p>`)


const btn = document.getElementById("btn");
btn.addEventListener('click', change);

function change() {
    document.getElementById("text_changed").innerHTML = '';
    const regexp = /\'\B/g;

    let new_text = text.replace(regexp, '"');   
    document.getElementById("text_changed").insertAdjacentHTML('beforeend', `<p>${new_text}</p>`)
    
}


// 3 задание
// * Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a.  Имя содержит только буквы.
// b.  Телефон имеет вид +7(000)000-0000.
// c.  E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d.  Текст произвольный.
// e.  Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

class Validator {
    constructor (name, phone, email, text) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.text = text;
    }
    chek_name() {
        const regexp = /^\D+$/gi;
            if (this.name.value) {
                let check_name = (this.name.value).match(regexp);
            if (check_name == null) {
                this.name.classList.add('border_red')
            } else {
                this.name.classList.add('border_green')
            }
        }
        
    }
    chek_phone() {
        if (this.phone.value) {
            const regexp = /.?\d{3}.?\d{3}.?\d{4}/gi;
            let check_phone = (this.phone.value).match(regexp);
            if (check_phone == null) {
                this.phone.classList.add('border_red')
            } else {
                this.phone.classList.add('border_green')
            }
        }
    }
    chek_email() {
        if (this.email.value) {
            const regexp = /^[a-zA-Z].+[a-zA-Z]@[a-zA-Z]+.[a-zA-Z]{2}$/g;
            let check_email = (this.email.value).match(regexp);
            if (check_email == null) {
                this.email.classList.add('border_red')
            } else {
                this.email.classList.add('border_green')
            }
        }
    }
}




let input_name = document.getElementById("input_name");
let input_phone = document.getElementById("input_phone");
let input_email = document.getElementById("input_email");
let input_text = document.getElementById("input_text");



document.getElementById('btn_checker').addEventListener('click', () => {
    let input_name = document.getElementById("input_name");
    let input_phone = document.getElementById("input_phone");
    let input_email = document.getElementById("input_email");

    let val = new Validator(input_name, input_phone, input_email, input_text);
    val.chek_name();
    val.chek_phone();
    val.chek_email();
})
