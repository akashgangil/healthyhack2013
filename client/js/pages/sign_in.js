function render_sign_in() {
    var template = Handlebars.compile(template_sign_in);
    var context = {title: "My New Post", body: "This is my first post!"}
    var html    = template(context);
    $( ".container" ).html( html );
}
