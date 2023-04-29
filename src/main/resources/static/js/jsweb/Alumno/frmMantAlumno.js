$(document).on("click", "#btnagregaralumno", function() {
	$("#txtnombre").val("");
	$("#txtapellido").val("");
	$("#txtproce").val("");
	$("#hddidalumno").val("0");	
	$("#cboEspecialidad").empty();
	$.ajax({
		type: "GET",
		url: "/Especialidad/listarEspecialidad",
		dataType: "json",
		success: function(resultado) {
			$.each(resultado, function(index, value) {
				$("#cboEspecialidad").append(
					`<option value="${value.idesp}">${value.nomesp}</option>`
				)
			})
		}
	});
	$("#modalNuevoAlumno").modal("show");
});
$(document).on("click", ".btnactualizaralumno", function() {

	$("#txtnombre").val($(this).attr("data-nomalumno"));
	$("#txtapellido").val($(this).attr("data-apealumno"));
	$("#txtproce").val($(this).attr("data-proce"));
	$("#hddidalumno").val($(this).attr("data-codalumno"));
	$("#cboEspecialidad").empty();
	var idesp = $(this).attr("data-idesp");
	$.ajax({
		type: "GET",
		url: "/Especialidad/listarEspecialidad",
		dataType: "json",
		success: function(resultado) {
			$.each(resultado, function(index, value) {
				$("#cboEspecialidad").append(`<option value="${value.idesp}">${value.nomesp}</option>`);
			});
			$("#cboEspecialidad").val(idesp);
		}		
	});	
	$("#modalNuevoAlumno").modal("show");
});

$(document).on("click", "#btnguardaralumno", function() {
	$.ajax({
		type: "POST",
		url: "/Alumno/registrarAlumno",
		contentType: "application/json",
		data: JSON.stringify({
			idalumno: $("#hddidalumno").val(),
			nomalumno: $("#txtnombre").val(),
			apealumno: $("#txtapellido").val(),
			idesp: $("#cboEspecialidad").val(),
			proce: $("#txtproce").val()
		}),
		success: function(resultado) {
			if (resultado.respuesta) {
				ListarAlumnos();
				mostrarMensaje(resultado.mensaje, "success");				
			} else {
				mostrarMensaje(resultado.mensaje, "danger");
			}
		}
	});
	$("#modalNuevoAlumno").modal("hide");
});

$(document).on("click", ".btneliminaralumno", function() {
	$("#hddidalumnoeliminar").val("");
	$("#mensajeeliminar").text("¿Está seguro de eliminar al alumno: " +
		$(this).attr("data-nomalumno") + "?");
	$("#hddidalumnoeliminar").val($(this).attr("data-codalumno"));
	$("#modalEliminarAlumno").modal("show");
});
$(document).on("click", "#btnEliminarAlumno", function() {
	$.ajax({
		type: "DELETE",
		contentType: "application/json",
		url: "/Alumno/eliminarAlumno",
		data: JSON.stringify({
			idalumno: $("#hddidalumnoeliminar").val()
		}),
		success: function(resultado) {
			if (resultado.respuesta) {				
				ListarAlumnos();
				mostrarMensaje(resultado.mensaje, "success");				
			} else {
				console.log(resultado.mensaje);
				mostrarMensaje(resultado.mensaje, "danger");
			}
			$("#modalEliminarAlumno").modal("hide");
		}
	})
});


function mostrarMensaje(mensaje, estilo) {
	$("#mensaje").html("")
	$("#mensaje").append("<div class='alert alert-" + estilo + " alert-dismissible fade show' role='alert'>" +
		"<strong>" + mensaje + "</strong>" +
		"<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>" +
		"</div>")
}

function ListarAlumnos(){
	$.ajax({
		type: "GET",
		url: "/Alumno/listarAlumno",
		dataType: 'json',
		success: function(resultado){
			$("#tblalumno > tbody").html("");
			$.each(resultado, function(index, value){
				$("#tblalumno > tbody").append("<tr>" +
				"<td>" + value.idalumno+"</td>" + 
				"<td>" + value.nomalumno+"</td>" +
				"<td>" + value.apealumno+"</td>" +
				"<td>" + value.nomesp+"</td>" +
				"<td>" + value.proce+"</td>" +
				"<td>"+
					"<button type='button' class='btn btn-info btnactualizaralumno'"+
						"data-codalumno='"+value.idalumno+"'"+
						"data-nomalumno='"+value.nomalumno+"'"+
						"data-apealumno='"+value.apealumno+"'"+
						"data-idesp='"+value.idesp+"' th:data-proce='"+value.proce+"'>"+
						"Actualizar</button>"+
				"</td>"+
				"<td>"+
					"<button type='button' class='btn btn-danger btneliminaralumno'"+
						"data-codalumno='"+value.idalumno+"'"+
						"data-nomalumno='"+value.nomalumno+"'>"+						
						"Eliminar</button>"+
				"</td></tr>");
			});	
		}
	});
}



