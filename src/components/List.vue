<template>
    <div>
        <v-data-table :headers="computedHeaders" :items="libraryDisplay">
            <template v-slot:item.action="">
                <v-btn icon>
                    <v-icon small class="mr-2">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon small>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>

    export default {
        name: "List",
        components: {},
        data() {
            return {
                selected: null,
            }
        },
        props: {
            library: {type: Array,},
            type: {type: String},
            /*games: {
                type: Array,
                required: true,
            },
            books: {
                type: Array,
                required: true,
            },
            filtered: {
                type: Number,
                required:true,
            }*/
        },
        methods: {
            removeBook(book) {
                this.$emit('remove-book', book);
            },
            editBook(book) {
                this.$emit('edit-book', book);
            },
            addItem() {
                this.$emit('add-item', this.selected);
            }

        },
        computed: {
            libraryDisplay: function () {
                let starter = this.library.filter(value => value.media.type === this.type);
                let returnArray = [];
                starter.forEach(obj =>
                    returnArray.push(obj.media.traits));
                return returnArray;
            },
            computedHeaders: function () {
                let headerKey = [];
                if (this.libraryDisplay.length > 0) {
                    Object.keys(this.libraryDisplay[0]).forEach(trait => headerKey.push({
                        text: trait.toUpperCase(),
                        value: trait
                    }));
                    headerKey.push({text: 'Actions', value: 'action', sortable: false})
                }
                return headerKey;

            },
        },
    }
</script>

<style scoped>

</style>