package pe.edu.idat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import pe.edu.idat.model.bd.Alumno;
import pe.edu.idat.model.bd.Especialidad;
import pe.edu.idat.model.bd.sp.AlumnoEspecialidadSp;
import pe.edu.idat.model.request.AlumnoRequest;
import pe.edu.idat.model.response.ResultadoResponse;
import pe.edu.idat.service.AlumnoService;

@Controller
@RequestMapping("/Alumno")
public class AlumnoController {

	@Autowired
	private AlumnoService aService;

	@GetMapping("/frmMantAlumno")
	public String frmListarAlumnos(Model model) {
		model.addAttribute("listalumnos", aService.listarAlumnos());
		return "Alumno/frmMantAlumno";
	}

	@PostMapping("/registrarAlumno")
	@ResponseBody
	public ResultadoResponse registrarAlumno(@RequestBody AlumnoRequest objAlumnoRequest) {
		String mensaje = "Alumno registrado correctamente";
		Boolean respuesta = true;
		try {
			Alumno objAlumno = new Alumno();
			objAlumno.setIdalumno(objAlumnoRequest.getIdalumno());
			objAlumno.setNomalumno(objAlumnoRequest.getNomalumno());
			objAlumno.setApealumno(objAlumnoRequest.getApealumno());
			objAlumno.setProce(objAlumnoRequest.getProce());
			Especialidad objEspecialidad = new Especialidad();
			objEspecialidad.setIdesp(objAlumnoRequest.getIdesp());
			objAlumno.setEspecialidad(objEspecialidad);
			aService.registrarAlumno(objAlumno);
		} catch (Exception e) {
			mensaje = "Alumno no registrado";
			respuesta = false;
		}
		return new ResultadoResponse(respuesta, mensaje);
	}

	@DeleteMapping("/eliminarAlumno")
	@ResponseBody
	public ResultadoResponse eliminarAlumno(@RequestBody AlumnoRequest objAlumnoRequest) {
		String mensaje = "Alumno eliminado correctamente";
		Boolean respuesta = true;
		try {			
			aService.eliminarAlumno(objAlumnoRequest.getIdalumno());
		} catch (Exception e) {
			mensaje = "Alumno no eliminado";
			respuesta = false;
		}
		return new ResultadoResponse(respuesta, mensaje);
	}
	
	@GetMapping("/listarAlumno")
	@ResponseBody
	public List<AlumnoEspecialidadSp> listarAlumno(){
		return aService.listarAlumnos();
	}

}
