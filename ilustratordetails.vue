<template>
    <div class="container" style="text-align: justify;">
        <h1>Ilustrator Details</h1>
        <form>
            <div class="form-group">
                <label for="nameInput">Name:</label>
                <input type="text" class="form-control" readonly name="name" v-model='this.ilustrator.name'>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="nationalityInput">Nationality:</label>
                    <input type="text" class="form-control" readonly name="nationality" v-model='this.ilustrator.nationality'>
                </div>
                <div class="form-group col-md-6">
                    <label for="birthdayInput">Birthday:</label>
                    <input type="text" class="form-control" readonly name="birthday" v-model='this.ilustrator.birthday'>
                </div>
            </div>
        </form>
        <h1>Books</h1>
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
        <router-link class="btn btn-primary" :to="'/ilustrator'">Back</router-link>
    </div>
</template>

<script>
module.exports = {
    props:['title'],
    data:function () {
        return {
            ilustrator:[]
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
                console.log('Print: ' + this.ilustrator.name);
            })
            .catch(function (error) {
                console.log('Error f1: ' + error);
            })
        }
    }
}

</script>