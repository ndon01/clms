package com.clms.api.common.web.util;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class PaginationRequest {

    private int page = 0;
    private int size = 10;
    private String[] sort = {"id", "asc"};

    public PageRequest toPageRequest() {
        if (sort.length < 2) {
            return PageRequest.of(page, size);
        }

        String sortBy = sort[0];
        Sort.Direction direction = Sort.Direction.fromString(sort[1]);

        return PageRequest.of(page, size, Sort.by(direction, sortBy));
    }
}
