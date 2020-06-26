$(document).ready(function() {
	//faccio partire la chiamata ajax, una volta caricato il documento,....
  $.ajax({
    // ...alla url degli album e prendo i dati dall'API.
    url:'https://flynn.boolean.careers/exercises/api/array/music',
    method: 'GET',
    // In caso di successo, parte la funzione che prende i dati e...
    success: function (data){
      var album = data.response;
      console.log(album);
      // ...li stampa usando il template Handlebars.
      printMusicAlbum(album);
    },
    // In caso di errore darà un messaggio alert di errore.
    error: function(){
      alert("errore!");
    }
  })
  // Scrivo la funzione per stampare i dati dell'API con Handlebars.
  function printMusicAlbum(allMusicAlbum){
    // Prendo la source (tramite Handlebars)...
    var source = document.getElementById("entry-template").innerHTML;
    // ...poi scrivo la variabile che andrà a compilare la source.
    var template = Handlebars.compile(source);
    // faccio partire un ciclo for...
    for (var i = 0; i < allMusicAlbum.length; i++) {
      // ...che prende i dati di ogni singolo Album...
      var singleAlbum = allMusicAlbum[i];
      // ...li inserisce nel template Handlebars...
      var html = template(singleAlbum);
      // ...e li appende al container dei cd.
      $('.cds-container').append(html);
    }
  }
  // creo un sort by genere al click su option
  $(".option").on("click", function () {
    // creo una variabile che prende il valore dell'opzione cliccata....
		var selected = $(this).val();
    // ...se questo valore corrisponde a "Tutti"...
		if (selected === "Tutti") {
      // ...mostra tutti gli album,...
			$(".cd").show();
		} else {
      // ...altrimenti scorre tutti gli album e...
			$(".cd").each(function () {
        //...se trova il valore dell'album corrispondente all'opzione selezionata
				if ($(this).find(".genre").text() === selected) {
          // ...mostra gli album di quel genere...
					$(this).show();
          // ...e nasconde gli altri
				} else {
					$(this).hide();
				}
			});
		}
	});
});
