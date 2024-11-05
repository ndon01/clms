package com.clms.api.courses.modules;

import com.clms.api.courses.api.projections.CourseModuleProjection;
import com.clms.api.courses.api.projections.converters.CourseDetailsProjectionConverter;
import com.clms.api.courses.modules.dto.CourseModuleCreationDto;
import com.clms.api.courses.modules.services.CourseModuleCreationService;
import com.clms.api.courses.modules.services.CourseModuleUpdateService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses/modules")
@RequiredArgsConstructor
@Tag(name = "Course", description = "Endpoints for managing courses")
public class CourseModulesController {

    private final CourseModuleRepository courseModuleRepository;
    private final CourseDetailsProjectionConverter courseDetailsProjectionConverter;
    private final CourseModuleCreationService courseModuleCreationService;
    private final CourseModuleUpdateService courseModuleUpdateService;

    @GetMapping("/getById")
    private ResponseEntity<CourseModuleProjection> getCourseModuleById(@RequestPart Integer id) {
        CourseModuleEntity courseModule = courseModuleRepository.findById(id).orElse(null);
        if (courseModule == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(CourseModuleProjection.builder()
                .id(courseModule.getId())
                .title(courseModule.getTitle())
                .moduleOrder(courseModule.getModuleOrder())
                .course(courseDetailsProjectionConverter.convert(courseModule.getCourse()))
                .build());

    }

    @GetMapping("/getModulesByCourseId")
    private ResponseEntity<List<CourseModuleProjection>> getCourseModulesByCourseId(@RequestParam Integer courseId) {
        List<CourseModuleEntity> courseModules = courseModuleRepository.findByCourseId(courseId);

        return ResponseEntity.ok(courseModules.stream().map(this::convertToCourseModuleProjection).collect(Collectors.toList()));
    }

    @PostMapping("/create")
    private ResponseEntity<CourseModuleProjection> createCourseModule(@RequestBody CourseModuleCreationDto courseModuleCreationDto) {
        return ResponseEntity.status(201).body(courseModuleCreationService.createCourseModule(courseModuleCreationDto));
    }


    // todo: these update endpoints are being used for an initial implementation of the reorder feature
    // todo: these should be removed and replaced with a single endpoint that updates the module order of a course (probably)
    @PostMapping("/update")
    private ResponseEntity<CourseModuleProjection> updateCourseModule(@RequestBody CourseModuleProjection courseModuleProjection) {
        return ResponseEntity.ok(courseModuleUpdateService.updateCourseModule(courseModuleProjection));
    }

    @PostMapping("/update-bulk")
    private ResponseEntity<List<CourseModuleProjection>> updateCourseModules(@RequestBody List<CourseModuleProjection> courseModuleProjections) {
        return ResponseEntity.ok(courseModuleUpdateService.updateCourseModules(courseModuleProjections));
    }


    // todo: validate user can delete modules
    @PostMapping("/delete")
    private ResponseEntity<Void> deleteCourseModule(@RequestPart Integer id) {
        Optional<CourseModuleEntity> courseModule = courseModuleRepository.findById(id);
        if (courseModule.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        courseModuleRepository.delete(courseModule.get());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/delete-bulk")
    private ResponseEntity<Void> deleteCourseModules(@RequestBody List<Integer> ids) {
        List<CourseModuleEntity> courseModules = courseModuleRepository.findAllById(ids);
        courseModuleRepository.deleteAll(courseModules);
        return ResponseEntity.noContent().build();
    }

    private CourseModuleProjection convertToCourseModuleProjection(CourseModuleEntity courseModule) {
        return CourseModuleProjection.builder()
                .id(courseModule.getId())
                .title(courseModule.getTitle())
                .moduleOrder(courseModule.getModuleOrder())
                .course(courseModule.getCourse() != null ? courseDetailsProjectionConverter.convert(courseModule.getCourse()) : null)
                .build();
    }
}
