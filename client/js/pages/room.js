
function room() {
    <script type="application/javascript">
        var context = {title: "My New Post", body: "This is my first post!"}
        var html    = template(context);
        $( ".container" ).append( html );
    </script>
}