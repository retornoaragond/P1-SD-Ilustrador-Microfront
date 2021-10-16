<template>
    <div class="container" style="text-align: justify;">
        <h1>Ilustrator Create</h1>
        <form>
            <div class="form-group">
                <label for="nameInput">Name:</label>
                <input type="text" class="form-control" name="name" v-model='name'>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="nationalityInput">Nationality:</label>
                    <input type="text" class="form-control" name="nationality" v-model='nationality'>
                </div>
                <div class="form-group col-md-6">
                    <label for="birthdayInput">Birthday:</label>
                    <input type="text" class="form-control" name="birthday" v-model='birthday'>
                </div>
            </div>
            <div class="form-group">
                <label for="idInput">Id:</label>
                <input type="text" class="form-control" readonly name="id" v-model='id'>
            </div>
        </form>
        <router-link class="btn btn-primary" :to="'/ilustrator'">Back</router-link>
        <a class="btn btn-primary" v-on:click="createIlustrator()">Create</a>
    </div>
</template>

<script>
// import axios from 'axios'
module.exports = {
    props:['title','create'],
    data:function () {
        return {
            ilustrators:[],
            id : 0,
            name : '',
            nationality:'',
            birthday:'',
            comics:[]
        }
    },
    created () {
        this.getIlustrators()
    },
    methods: {
        getIlustrators(){
            fetch('https://p1-sd-ilustrador-microservice.herokuapp.com/ilustrador',{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.ilustrators = data; 
                this.id = this.getNextId(this.ilustrators)               
            })
        },
        getNextId(obj) {
            return (Math.max.apply(Math, obj.map(function(o) {
                return o.id;
            })) + 1);
        },
        createIlustrator(){
            let ilus = {"id":this.id,"name":this.name,"nationality":this.nationality,"birthday":this.birthday,"comics":this.comics};
            console.log(JSON.stringify(ilus));
            const opc = {
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({ id:this.id,name:this.name,nationality:this.nationality,birthday:this.birthday,comics:this.comics})
            };
            fetch("https://p1-sd-ilustrador-microservice.herokuapp.com/ilustrador",opc)
                .then((data) => {
                console.log('Print1: ' + data.name);
                router.push('/ilustrator');
            })
            /*fetch('https://p1-sd-ilustrador-microservice.herokuapp.com/ilustrador',
                { headers: {'Accept': 'application/json'},
                  method: 'POST',
                  mode: 'no-cors',
                  body: JSON.stringify(ilus)
                })
            .then((data) => {
                console.log('Print1: ' + JSON.stringify(ilus).name);
                router.push('/ilustrator');
            })*/
            // console.log('Print: ' + this.quest[0].desc);
        }
    }
}

</script>