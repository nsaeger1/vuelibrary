<template>
  <v-container fluid fill-height>
    <media-table :auth-user="authUser"/>
  </v-container>
</template>

<script>
  import MediaTable from "../components/MediaTable";
  export default {
    components: {MediaTable},
    props: {
      authUser: {required: true},
    },
  }

</script>