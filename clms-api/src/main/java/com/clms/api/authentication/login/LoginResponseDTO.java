package com.clms.api.authentication.login;

import com.clms.api.users.api.projections.UserProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponseDTO {
    private String accessToken;
    private UserProjection user;
}
