package com.clms.api.common.interfaces;

public interface BaseEntityMerger<T, F> {
    T merge(F source);
}
