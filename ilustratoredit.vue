<template>
    <div class="container" style="text-align: justify;">
        <h1>Ilustrator Edit</h1>
        <form>
            <div class="form-group">
                <label for="nameInput">Name:</label>
                <input type="text" class="form-control" name="name" v-model='ilustrator.name'>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="nationalityInput">Nationality:</label>
                    <input type="text" class="form-control" name="nationality" v-model='ilustrator.nationality'>
                </div>
                <div class="form-group col-md-6">
                    <label for="birthdayInput">Birthday:</label>
                    <input type="text" class="form-control" name="birthday" v-model='ilustrator.birthday'>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <h1>Comics:</h1>
                </div>
                <div class="form-group col-md-6">
                    <button class="btn btn-primary" id="show-modal" @click="showModal = true">Assign Comics</button>
                </div>
            </div>            
            <table class="table table-sm text-left">
                <thead>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="comic in this.ilustrator.comics">                       
                        <td>
                            <li><a :href="'https://p1-sd-revistas-microservice.herokuapp.com/revista/'+comic.comic_id">{{comic.comic_name}}</li>
                            <!-- Cambiar por el microfront end -->
                        </td>
                    </tr>                  
                </tbody>
            </table>
        </form>
        <router-link class="btn btn-primary" :to="'/ilustrator'">Back</router-link>
        <button class="btn btn-primary" v-on:click="updateIlustrator()">Edit</button>
        
        <div v-if="showModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Assign Comics</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="showModal = false">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <!-- -->
                                    <table class="table table-sm text-left">
                                        <thead>
                                            <tr>
                                                <td>Name</td>
                                                <td>Name</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="comic in this.comics">  
                                                <td>{{comic.name}}</td>                     
                                                <td>
                                                   <button type="button" class="btn btn-primary" v-on:click="addcomic(comic.id,comic.name)">Add</button>
                                                </td>
                                            </tr>                  
                                        </tbody>
                                    </table>
                                    <!-- -->
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                                    <button type="button" class="btn btn-primary" v-on:click="addcomic()">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
module.exports = {
    props:['title','create'],
    data:function () {
        return {
            ilustrator:[],
            comics:[],
            showModal:false,
            selected:'',
            com:[],
            comp:[]
        }
    },
    created () {
        this.getIlustrator(app.$route.params.id)
    },
    methods: {
        getIlustrator(id){
            fetch('https://p1-sd-ilustrador-microservice.herokuapp.com/ilustrador/'+id,{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.ilustrator = data;               
            })
        },
        openModal(){
            this.showmodal = true
        },
        getComics(){
            fetch('https://p1-sd-revistas-microservice.herokuapp.com/revista',{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.comics = data;
            })
        },
        updateIlustrator(){
            let ilus = {"id":this.ilustrator.id,"name":this.ilustrator.name,"nationality":this.ilustrator.nationality,"birthday":this.ilustrator.birthday,"comics":this.ilustrator.comics};
            console.log(JSON.stringify(ilus));
            const opc = {
                method:"PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({ id:this.ilustrator.id,name:this.ilustrator.name,nationality:this.ilustrator.nationality,birthday:this.ilustrator.birthday,comics:this.ilustrator.comics})
            };
            fetch("https://p1-sd-ilustrador-microservice.herokuapp.com/ilustrador/"+this.ilustrator.id,opc)
                .then((data) => {
                console.log('Print1: ' + data.name);
                router.push('/ilustrator');
            })
            console.log(opc);
        },
        addcomic(id,name){
            let ide = id;
            let nam = name;
            let c = [];
            c.push({comic_id:ide,comic_name:nam})
            this.ilustrator.comics = c
            console.log(c);
            this.showModal = false;
        }
    }
}

</script>
<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

</style>