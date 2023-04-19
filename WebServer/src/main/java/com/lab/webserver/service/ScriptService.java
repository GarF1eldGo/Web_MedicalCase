package com.lab.webserver.service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.CharBuffer;
import java.nio.charset.CharsetEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class ScriptService {
    private Process process;

    public void startScript(String scriptPath) {
        try {
            ProcessBuilder pb = new ProcessBuilder("python", scriptPath);
            pb.redirectErrorStream(true);
            process = pb.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String readScriptOutput() {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder output = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                output.append(line);
                break;
            }
            return output.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "fail";
        }
    }

    public void sendInputToScript(String input) {
        try {
            OutputStream stdin = process.getOutputStream();
            stdin.write(input.getBytes("UTF-8"));
//            stdin.flush();
            stdin.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void stopScript() {
        try {
            process.destroy();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
