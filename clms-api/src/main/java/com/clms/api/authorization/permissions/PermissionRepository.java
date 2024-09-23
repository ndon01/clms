package com.clms.api.authorization.permissions;

import com.clms.api.authorization.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Integer> {

    Optional<Permission> findByNameEqualsIgnoreCase(String names);

    @Query(value = "SELECT p.* FROM permissions p JOIN role_permissions rp ON p.id = rp.permission_id WHERE rp.role_id = :roleId", nativeQuery = true)
    List<Permission> getPermissionsForRoleId(@Param("roleId") int roleId);

}
