LEAD
{
    name: '',
    rg: '',
    cpf: '',
    cnpf: '',
    cellphone: '',
    email: UNIQUE,
    address: {
        cep: '',
        rua: '',
        logradouro: '',
        numero: '',
        estado: '',
        pais: ''
    },
    store_address: {
        cep: '',
        rua: '',
        logradouro: '',
        numero: '',
        estado: '',
        pais: ''
    },
    documents: { attachment: 'img1.jpg, img2.jpg' },
    gallery_store: { attachment: 'loja1.jpg, loja2.jpg' },
    payments_id: { 1, 2, 3, 4 },
    current_payment: 5,
    whatsapp_status: ''
}

PROFESSIONAL
{
    name: '',
    rg: '',
    cpf: '',
    cnpf: '',
    cellphone: '',
    email: UNIQUE,
    address: {
        cep: '',
        rua: '',
        logradouro: '',
        numero: '',
        estado: '',
        pais: ''
    },
    documents: { attachment: 'img1.jpg, img2.jpg' }
}

ROLES
{
    'Admin': 7751,
    'Professional': 6621,
    'Client': 3312
}

USER ROLE
{ 
    email: UNIQUE,
    nickname: LEAD.CPF || PROFESSIONAL.CPF || ADMIN.NAME_JJ,
    password: '',
    role: 3312 || 6621 || 7751
}

PAYMENTS
{
    payment_id: '',
    extract_id: '',
    status: '',
    payment_detail: {
        //PAYMENT BODY
    },
    tax: '',
    price: '',
    cpf: '',
    professionalEmail: ''
}

EXTRACT 
{
    email: '',
    payment_link: ''
}

SETTINGS
{
    mercado_pago_store: UNIQUE,
    mercado_pago_key: UNIQUE,
    mercado_pago_token: UNIQUE,
    pagseguro_id: UNIQUE,
    pagseguro_key: UNIQUE,
    pagseguro_public_key: UNIQUE,
    tax: UNIQUE,
    whatsapp_message: UNIQUE
}

FAQ
{
    item: {
        doubt: '',
        answer: ''
    }
}