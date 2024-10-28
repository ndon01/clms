package com.clms.api.common.interfaces;

public interface GenericConverter<F, T> {
    T convert(F from);
}
