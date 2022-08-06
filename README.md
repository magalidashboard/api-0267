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
    'professional': 6621,
    'client': 3312
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
}

EXTRACT 
{
    email: '',
    payment_link: ''
}

SETTINGS
{
    mercado_pago: 
    {
        store: '',
        public_key: ''
    },
    pagseguro:
    {
        app_id: '',
        app_key: ''
        public_key: ''
    },
    tax: '',
    whatsapp_message: ''
}

FAQ
{
    item: {
        doubt: '',
        answer: ''
    }
}