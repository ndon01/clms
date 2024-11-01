package com.clms.api.filestorage;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@Getter
@Setter
@Builder
public class CustomMultipartFile implements MultipartFile {
    private final byte[] bytes;
    private final String name;
    private final String originalFilename;
    private final String contentType;

    @Override
    public boolean isEmpty() {
        return bytes == null || bytes.length == 0;
    }

    @Override
    public long getSize() {
        return bytes.length;
    }

    @Override
    public InputStream getInputStream() {
        if (bytes == null) {
            throw new IllegalStateException("File is empty. Cannot get an InputStream.");
        }
        return new ByteArrayInputStream(bytes);
    }

    @Override
    public void transferTo(File dest) throws IOException, IllegalStateException {
        if (bytes == null) {
            throw new IllegalStateException("File is empty. Cannot transfer.");
        }
        new FileOutputStream(dest).write(bytes);
    }
}
