package com.clms.api.common.web.projections;

public interface GenericProjectionConverter<F, T> {
    T convert(F from);
}
