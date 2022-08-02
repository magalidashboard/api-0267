JSON STRUCTURE

LEAD 

{
    name: '',
    birthDate: '',
    age: '',
    genre: '',
    completeAddress: '',
    profession: '',
    cellphone: '',
    email: '',
    maritalStatus: '',
    childrens?: { 
        answer: 'yes', 
        quantity: '',
        childs: [ 
            {
                name: '',
                age: '', 
                birthDate: ''
            }
        ] 
    },
    documents: [
        { type: 'resume', attachment: 'example.pdf' },
        { type: 'coren', attachment: 'example.png' }
    ],
    areaChoosedID: 1,
    hasBusiness: { 
        status: 'yes', 
        type: 'mei' 
    },
    partner: ''
    terms: ''
},

PARTNER
{
    email: '',
    socialName: '',
    cnpj: ''
},

LEAD APRROVED?
{
    id: Lead,
    hasApproved: 'false'
}

MULTIPLE CHOICES
{
    //WORKING ON
},

REDUCED LEAD

{
    name: '',
    birthDate: '',
    password: '',
    age: '',
    profession: '',
    cellphone: '',
    email: '',
    areaChooseID: 1,
    documents: [
        { type: 'resume', attachment: 'example.pdf' },
        { type: 'coren', attachment: 'example.png' }
    ],
    hasBusiness: { 
        status: 'yes', 
        type: 'mei' 
    },
    terms: ''
},

WORK AREA

{
    areaChoose: [
        { id: 1, areaType: 'SAUDE', areaChoose: 'ENFERMEIRO', areaDoc: 'COREN' },
    ],
}
