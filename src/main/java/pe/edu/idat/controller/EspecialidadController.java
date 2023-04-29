package pe.edu.idat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import pe.edu.idat.model.bd.Especialidad;
import pe.edu.idat.service.EspecialidadService;

@Controller
@RequestMapping("/Especialidad")
public class EspecialidadController {
	
	@Autowired
	private EspecialidadService especialidadService;
	
	@GetMapping("/listarEspecialidad")
	@ResponseBody
	public List<Especialidad> listarEspecialidad(){
		return especialidadService.listarEspecialidad();
	}
	

}
